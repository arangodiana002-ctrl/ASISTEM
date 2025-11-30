import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Client, View, Role } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { AdvisorSidebar } from './AdvisorSidebar';
import { useState } from 'react';

interface ClientListProps {
  clients: Client[];
  filter: View;
  onNavigate: (view: View) => void;
  onSelectClient: (client: Client) => void;
  currentRole: Role;
}

export function ClientList({ clients, filter, onNavigate, onSelectClient, currentRole }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getTitle = () => {
    switch (filter) {
      case 'interesados':
        return 'Clientes Interesados';
      case 'no-interesados':
        return 'Clientes No Interesados';
      case 'no-contestan':
        return 'Archivo - No Contestan';
      default:
        return 'Todos los Clientes';
    }
  };

  const getFilteredClients = () => {
    let filtered = clients;
    
    if (filter === 'interesados') {
      filtered = clients.filter(c => c.status === 'interesado' || c.status === 'nuevo');
    } else if (filter === 'no-interesados') {
      filtered = clients.filter(c => c.status === 'no-interesado');
    } else if (filter === 'no-contestan') {
      filtered = clients.filter(c => c.status === 'no-contesta');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.telefono.includes(searchTerm)
      );
    }
    
    return filtered;
  };

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

  const filteredClients = getFilteredClients();

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar del Asesor */}
      {currentRole === 'advisor' && (
        <AdvisorSidebar clients={clients} />
      )}

      {/* Header */}
      <div className="border-b-2 border-gray-800 bg-gray-100 px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            className="border-2 border-gray-800"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
        </div>
        <h1 className="text-gray-900">{getTitle()}</h1>
        <p className="text-gray-600 mt-2">{filteredClients.length} cliente(s) encontrado(s)</p>
      </div>

      <div className={`max-w-7xl mx-auto px-8 py-8 ${currentRole === 'advisor' ? 'mr-80' : ''}`}>{/* Added conditional margin */}
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, empresa o teléfono..."
              className="pl-10 border-2 border-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-2 border-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Client Table */}
        <div className="border-2 border-gray-800 bg-white overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left px-6 py-4">Nombre</th>
                <th className="text-left px-6 py-4">Teléfono</th>
                <th className="text-left px-6 py-4">Empresa</th>
                <th className="text-left px-6 py-4">Salario</th>
                <th className="text-left px-6 py-4">Estado</th>
                <th className="text-left px-6 py-4">Último Contacto</th>
                <th className="text-left px-6 py-4">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr 
                  key={client.id}
                  className={`border-b border-gray-300 hover:bg-gray-50 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  onClick={() => onSelectClient(client)}
                >
                  <td className="px-6 py-4 text-gray-900">{client.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{client.telefono}</td>
                  <td className="px-6 py-4 text-gray-600">{client.empresa}</td>
                  <td className="px-6 py-4 text-gray-600">{client.salario}</td>
                  <td className="px-6 py-4">{getStatusBadge(client.status)}</td>
                  <td className="px-6 py-4 text-gray-600">{client.ultimoContacto}</td>
                  <td className="px-6 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-gray-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClient(client);
                      }}
                    >
                      Ver Detalle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No se encontraron clientes con los criterios seleccionados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
