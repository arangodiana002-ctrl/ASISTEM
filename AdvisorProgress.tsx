import { ArrowLeft, Users, Target, TrendingUp, Clock } from 'lucide-react';
import { Advisor, Client } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AdvisorProgressProps {
  advisor: Advisor;
  clients: Client[];
  onNavigate: (view: any) => void;
}

export function AdvisorProgress({ advisor, clients, onNavigate }: AdvisorProgressProps) {
  const progresoPorcentaje = Math.round((advisor.progreso / advisor.meta) * 100);
  
  const clientesPorEstado = {
    interesados: clients.filter(c => c.status === 'interesado').length,
    nuevos: clients.filter(c => c.status === 'nuevo').length,
    noContestan: clients.filter(c => c.status === 'no-contesta').length,
    noInteresados: clients.filter(c => c.status === 'no-interesado').length
  };

  const progresoSemanal = [
    { semana: 'Sem 1', casos: 3 },
    { semana: 'Sem 2', casos: 5 },
    { semana: 'Sem 3', casos: 4 },
    { semana: 'Sem 4', casos: 3 }
  ];

  const actividadDiaria = [
    { dia: 'Lun', contactos: 5 },
    { dia: 'Mar', contactos: 7 },
    { dia: 'Mie', contactos: 4 },
    { dia: 'Jue', contactos: 6 },
    { dia: 'Vie', contactos: 8 }
  ];

  const getStatusBadge = (status: Client['status']) => {
    switch (status) {
      case 'interesado':
        return <Badge className="bg-gray-700 text-white border-gray-700">Interesado</Badge>;
      case 'no-interesado':
        return <Badge className="bg-gray-500 text-white border-gray-500">No Interesado</Badge>;
      case 'no-contesta':
        return <Badge className="bg-gray-400 text-gray-900 border-gray-400">No Contesta</Badge>;
      case 'nuevo':
        return <Badge className="bg-gray-800 text-white border-gray-800">Nuevo</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-gray-800 bg-gray-100 px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            className="border-2 border-gray-800"
            onClick={() => onNavigate('manager-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
        </div>
        <h1 className="text-gray-900">Progreso de {advisor.nombre}</h1>
        <p className="text-gray-600 mt-2">Análisis detallado de desempeño</p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* KPIs del Asesor */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-2 border-gray-800 bg-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Meta Mensual</p>
                <p className="text-gray-900">{advisor.meta} casos</p>
              </div>
              <Target className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-700 bg-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Progreso Actual</p>
                <p className="text-gray-900">{advisor.progreso} casos</p>
              </div>
              <TrendingUp className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-600 bg-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Clientes Activos</p>
                <p className="text-gray-900">{clients.length}</p>
              </div>
              <Users className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-500 bg-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">% Cumplimiento</p>
                <p className="text-gray-900">{progresoPorcentaje}%</p>
              </div>
              <Clock className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>
        </div>

        {/* Progreso hacia la Meta */}
        <Card className="p-6 border-2 border-gray-800 bg-white mb-8">
          <h2 className="text-gray-900 mb-4">Progreso hacia la Meta</h2>
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600">Casos cerrados este mes</p>
            <p className="text-gray-900">{advisor.progreso} de {advisor.meta} ({progresoPorcentaje}%)</p>
          </div>
          <Progress value={progresoPorcentaje} className="h-6 border-2 border-gray-800" />
          <p className="text-gray-600 mt-2">
            {advisor.meta - advisor.progreso > 0 
              ? `Faltan ${advisor.meta - advisor.progreso} casos para cumplir la meta`
              : '¡Meta cumplida!'}
          </p>
        </Card>

        {/* Gráficos de Rendimiento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <h2 className="text-gray-900 mb-6">Progreso Semanal</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progresoSemanal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="semana" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #1f2937' 
                  }}
                />
                <Line type="monotone" dataKey="casos" stroke="#1f2937" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-2 border-gray-800 bg-white">
            <h2 className="text-gray-900 mb-6">Actividad de Contactos (Esta Semana)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={actividadDiaria}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #1f2937' 
                  }}
                />
                <Bar dataKey="contactos" fill="#1f2937" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Distribución de Clientes */}
        <Card className="p-6 border-2 border-gray-800 bg-white mb-8">
          <h2 className="text-gray-900 mb-6">Distribución de Clientes por Estado</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border-2 border-gray-700 bg-gray-100">
              <p className="text-gray-600 mb-2">Interesados</p>
              <p className="text-gray-900">{clientesPorEstado.interesados}</p>
            </div>
            <div className="p-4 border-2 border-gray-600 bg-gray-200">
              <p className="text-gray-600 mb-2">Nuevos</p>
              <p className="text-gray-900">{clientesPorEstado.nuevos}</p>
            </div>
            <div className="p-4 border-2 border-gray-500 bg-gray-300">
              <p className="text-gray-600 mb-2">No Contestan</p>
              <p className="text-gray-900">{clientesPorEstado.noContestan}</p>
            </div>
            <div className="p-4 border-2 border-gray-400 bg-gray-400">
              <p className="text-gray-600 mb-2">No Interesados</p>
              <p className="text-gray-900">{clientesPorEstado.noInteresados}</p>
            </div>
          </div>
        </Card>

        {/* Lista de Clientes del Asesor */}
        <Card className="border-2 border-gray-800 bg-white p-6">
          <h2 className="text-gray-900 mb-6">Clientes Asignados ({clients.length})</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left px-4 py-3">Nombre</th>
                  <th className="text-left px-4 py-3">Empresa</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3">Último Contacto</th>
                  <th className="text-left px-4 py-3">Intentos</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr 
                    key={client.id}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-900">{client.nombre}</td>
                    <td className="px-4 py-3 text-gray-600">{client.empresa}</td>
                    <td className="px-4 py-3">{getStatusBadge(client.status)}</td>
                    <td className="px-4 py-3 text-gray-600">{client.ultimoContacto}</td>
                    <td className="px-4 py-3 text-gray-600">{client.intentosContacto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
