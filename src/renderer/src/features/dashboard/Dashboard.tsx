import { useState, useMemo } from "react"
import { format, subDays, isWithinInterval, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@renderer/hooks/useAuth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@renderer/components/ui/card"
import { Button } from "@renderer/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@renderer/components/ui/chart"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import {
  Users,
  Microscope,
  FileBarChart,
  Activity,
  CalendarIcon,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@renderer/components/ui/popover"
import { Calendar } from "@renderer/components/ui/calendar"

// ===== Definir tipo de datos =====
type ChartDataItem = {
  date: string
  pacientes: number
  examenes: number
  reportes: number
}

// ===== Generar datos mock =====
const generateChartData = (days: number = 60): ChartDataItem[] => {
  const data: ChartDataItem[] = []
  const today = new Date()
  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i)
    data.push({
      date: format(date, "yyyy-MM-dd"),
      pacientes: Math.floor(Math.random() * 15) + 1,
      examenes: Math.floor(Math.random() * 20) + 2,
      reportes: Math.floor(Math.random() * 8) + 1,
    })
  }
  return data
}

const allData: ChartDataItem[] = generateChartData(60)

// ===== Configuración del gráfico =====
const chartConfig = {
  pacientes: {
    label: "Pacientes Registrados",
    color: "#2563eb",
  },
  examenes: {
    label: "Exámenes Realizados",
    color: "#16a34a",
  },
  reportes: {
    label: "Reportes Generados",
    color: "#f97316",
  },
} satisfies ChartConfig

const getChartColor = (key: keyof typeof chartConfig) => chartConfig[key].color ?? '#000'

export function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("pacientes")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Filtrar datos por rango de fechas (usando objetos Date)
  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return allData
    return allData.filter((item) => {
      const date = parseISO(item.date)
      return isWithinInterval(date, { start: startDate, end: endDate })
    })
  }, [startDate, endDate])

  // Totales para mostrar
  const totals = useMemo(() => {
    return {
      pacientes: filteredData.reduce((acc, curr) => acc + curr.pacientes, 0),
      examenes: filteredData.reduce((acc, curr) => acc + curr.examenes, 0),
      reportes: filteredData.reduce((acc, curr) => acc + curr.reportes, 0),
      total: filteredData.reduce(
        (acc, curr) => acc + curr.pacientes + curr.examenes + curr.reportes,
        0
      ),
    }
  }, [filteredData])

  const resetDateRange = () => {
    setStartDate(subDays(new Date(), 30))
    setEndDate(new Date())
  }

  // Formatear fecha para mostrar en los botones
  const formatDateDisplay = (date: Date) => format(date, "dd/MM/yyyy")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido, {user?.name}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/patients">Pacientes</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/exams">Exámenes</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Tarjetas de resumen con iconos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-t-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.pacientes}</div>
            <p className="text-xs text-muted-foreground">En el período seleccionado</p>
          </CardContent>
        </Card>

        <Card className="border border-t-4 border-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exámenes</CardTitle>
            <Microscope className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.examenes}</div>
            <p className="text-xs text-muted-foreground">En el período seleccionado</p>
          </CardContent>
        </Card>

        <Card className="border border-t-4 border-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes</CardTitle>
            <FileBarChart className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.reportes}</div>
            <p className="text-xs text-muted-foreground">En el período seleccionado</p>
          </CardContent>
        </Card>

        <Card className="border border-t-4 border-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actividad</CardTitle>
            <Activity className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total}</div>
            <p className="text-xs text-muted-foreground">Suma de todas las métricas</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico con filtros */}
      <Card className="py-4 sm:py-0">
        <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
            <CardTitle>Actividad del Sistema</CardTitle>
            <CardDescription>
              Pacientes, exámenes y reportes en el período seleccionado
            </CardDescription>
            {/* Filtros con Calendar de Shadcn */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs font-medium">Desde:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-auto justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {formatDateDisplay(startDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    autoFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>

              <span className="text-xs font-medium">Hasta:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-auto justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {formatDateDisplay(endDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    autoFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetDateRange}
                className="text-xs"
              >
                Últimos 30 días
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap">
            {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map(
              (chart) => (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg leading-none font-bold sm:text-2xl">
                    {totals[chart].toLocaleString()}
                  </span>
                </button>
              )
            )}
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-80 w-full"
          >
            <LineChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })
                }}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => {
                  const key = value as keyof typeof chartConfig
                  return chartConfig[key]?.label || value
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-50"
                    labelFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="pacientes"
                stroke={getChartColor('pacientes')}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="examenes"
                stroke={getChartColor('examenes')}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="reportes"
                stroke={getChartColor('reportes')}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}