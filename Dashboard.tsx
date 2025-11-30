import { Users, UserCheck, UserX, PhoneOff, FileText } from 'lucide-react';
import { Client, View, Role } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AdvisorSidebar } from './AdvisorSidebar';

interface DashboardProps {
  clients: Client[];
  onNavigate: (view: View) => void;
  currentRole: Role;
}

export function Dashboard({ clients, onNavigate, currentRole }: DashboardProps) {
  const stats = {
    total: clients.length,
    interesados: clients.filter(c => c.status === 'interesado').length,
    noInteresados: clients.filter(c => c.status === 'no-interesado').length,
    noContestan: clients.filter(c => c.status === 'no-contesta').length,
    nuevos: clients.filter(c => c.status === 'nuevo').length,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar del Asesor */}
      {currentRole === 'advisor' && (
        <AdvisorSidebar clients={clients} />
      )}

      {/* Header */}
      <div className="border-b-2 border-gray-800 bg-gray-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Asistente Personal - Asesor de Libranza</h1>
            <p className="text-gray-600 mt-2">Sistema de gestión de clientes</p>
          </div>
          <div className="flex gap-3">
            <Button
              className="border-2 border-gray-800 bg-white text-gray-900 hover:bg-gray-800 hover:text-white"
              onClick={() => onNavigate('document-editor')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Redactar Documentos
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-800"
              onClick={() => onNavigate('role-selector')}
            >
              Cambiar Rol
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 mr-80">{/* Added margin for sidebar */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="p-6 border-2 border-gray-800 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onNavigate('all-clients')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Total Clientes</p>
                <p className="text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
            </div>
          </Card>

          <Card 
            className="p-6 border-2 border-gray-800 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => onNavigate('interesados')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Interesados</p>
                <p className="text-gray-900">{stats.interesados}</p>
              </div>
              <UserCheck className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>

          <Card 
            className="p-6 border-2 border-gray-700 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => onNavigate('no-interesados')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">No Interesados</p>
                <p className="text-gray-900">{stats.noInteresados}</p>
              </div>
              <UserX className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>

          <Card 
            className="p-6 border-2 border-gray-600 bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors"
            onClick={() => onNavigate('no-contestan')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">No Contestan</p>
                <p className="text-gray-900">{stats.noContestan}</p>
              </div>
              <PhoneOff className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-100 border-2 border-gray-800 p-8 mb-8">
          <h2 className="text-gray-900 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto py-4 border-2 border-gray-800 bg-white text-gray-900 hover:bg-gray-800 hover:text-white"
              onClick={() => onNavigate('all-clients')}
            >
              <FileText className="w-5 h-5 mr-2" />
              Ver Todos los Clientes
            </Button>
            <Button 
              className="h-auto py-4 border-2 border-gray-700 bg-white text-gray-900 hover:bg-gray-700 hover:text-white"
              onClick={() => onNavigate('interesados')}
            >
              <UserCheck className="w-5 h-5 mr-2" />
              Clientes Interesados
            </Button>
            <Button 
              className="h-auto py-4 border-2 border-gray-600 bg-white text-gray-900 hover:bg-gray-600 hover:text-white"
              onClick={() => onNavigate('no-contestan')}
            >
              <PhoneOff className="w-5 h-5 mr-2" />
              Archivo - No Contestan
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border-2 border-gray-800 p-8 bg-white">
          <h2 className="text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-300 pb-3">
              <div>
                <p className="text-gray-900">Juan Pérez</p>
                <p className="text-gray-500">Actualizado a: Interesado</p>
              </div>
              <p className="text-gray-500">Hoy</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-300 pb-3">
              <div>
                <p className="text-gray-900">María González</p>
                <p className="text-gray-500">Nuevo contacto registrado</p>
              </div>
              <p className="text-gray-500">Ayer</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Pedro Ramírez</p>
                <p className="text-gray-500">Archivado: No contesta</p>
              </div>
              <p className="text-gray-500">Hace 3 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
