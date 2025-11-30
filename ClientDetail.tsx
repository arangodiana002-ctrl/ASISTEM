
import { ArrowLeft, Phone, Mail, Building, DollarSign, Calendar, MessageSquare, Save, Package } from 'lucide-react';
import { Client, View, Role } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AdvisorSidebar } from './AdvisorSidebar';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ClientDetailProps {
  client: Client;
  onNavigate: (view: View) => void;
  onUpdateClient: (client: Client) => void;
  currentRole: Role;
}

export function ClientDetail({ client, onNavigate, onUpdateClient, currentRole }: ClientDetailProps) {
  const [status, setStatus] = useState(client.status);
  const [notas, setNotas] = useState(client.notas);
  const [intentosContacto, setIntentosContacto] = useState(client.intentosContacto);
  const [citaFecha, setCitaFecha] = useState(client.citaFecha || '');
  const [citaHora, setCitaHora] = useState(client.citaHora || '');
  const [producto, setProducto] = useState(client.producto || '');

  const handleSave = () => {
    const updatedClient = {
      ...client,
      status,
      notas,
      intentosContacto,
      citaFecha: citaFecha || undefined,
      citaHora: citaHora || undefined,
      producto: producto || undefined,
      ultimoContacto: new Date().toISOString().split('T')[0]
    };
    onUpdateClient(updatedClient);
    toast.success('Cliente actualizado correctamente');
  };

  const handleRegisterContact = () => {
    setIntentosContacto(prev => prev + 1);
    toast.success('Intento de contacto registrado');
  };

  const getStatusColor = () => {
    switch (status) {
      case 'interesado':
        return 'border-gray-700 bg-gray-100';
      case 'no-interesado':
        return 'border-gray-600 bg-gray-200';
      case 'no-contesta':
        return 'border-gray-500 bg-gray-300';
      default:
        return 'border-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar del Asesor */}
      {currentRole === 'advisor' && (
        <AdvisorSidebar clients={[]} selectedClient={client} />
      )}

      {/* Header */}
      <div className="border-b-2 border-gray-800 bg-gray-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button
                variant="outline"
                className="border-2 border-gray-800"
                onClick={() => onNavigate('all-clients')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la Lista
              </Button>
            </div>
            <h1 className="text-gray-900">{client.nombre}</h1>
            <p className="text-gray-600 mt-2">Ficha de Cliente</p>
          </div>
          <Button
            className="border-2 border-gray-800 bg-gray-800 hover:bg-gray-900"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-8 py-8 ${currentRole === 'advisor' ? 'mr-80' : ''}`}>{/* Added conditional margin */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className={`p-6 border-2 ${getStatusColor()}`}>
              <h2 className="text-gray-900 mb-4">Información de Contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-300">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-500">Teléfono</p>
                    <p className="text-gray-900">{client.telefono}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-300">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="text-gray-900">{client.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-300">
                  <Building className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-500">Empresa</p>
                    <p className="text-gray-900">{client.empresa}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-500">Salario</p>
                    <p className="text-gray-900">{client.salario}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-800 bg-white">
              <h2 className="text-gray-900 mb-4">Actividad</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-500">Último Contacto</p>
                    <p className="text-gray-900">{client.ultimoContacto}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-500">Intentos de Contacto</p>
                    <p className="text-gray-900">{intentosContacto}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-800"
                  onClick={handleRegisterContact}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Registrar Intento de Contacto
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-2 border-gray-800 bg-white">
              <h2 className="text-gray-900 mb-6">Gestión del Cliente</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="status" className="mb-2 block text-gray-900">
                    Estado del Cliente
                  </Label>
                  <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                    <SelectTrigger className="border-2 border-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuevo">Nuevo</SelectItem>
                      <SelectItem value="interesado">Interesado</SelectItem>
                      <SelectItem value="no-interesado">No Interesado</SelectItem>
                      <SelectItem value="no-contesta">No Contesta</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-gray-500 mt-2">
                    Cambia el estado según el interés del cliente
                  </p>
                </div>

                <div>
                  <Label htmlFor="producto" className="mb-2 block text-gray-900">
                    Producto de Interés
                  </Label>
                  <Select value={producto} onValueChange={setProducto}>
                    <SelectTrigger className="border-2 border-gray-800">
                      <SelectValue placeholder="Seleccionar producto..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crédito Libranza Premium">Crédito Libranza Premium</SelectItem>
                      <SelectItem value="Crédito Libranza Estándar">Crédito Libranza Estándar</SelectItem>
                      <SelectItem value="Crédito Libranza Express">Crédito Libranza Express</SelectItem>
                      <SelectItem value="Crédito Libranza Flexible">Crédito Libranza Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="citaFecha" className="mb-2 block text-gray-900">
                      Fecha de Cita
                    </Label>
                    <Input
                      id="citaFecha"
                      type="date"
                      value={citaFecha}
                      onChange={(e) => setCitaFecha(e.target.value)}
                      className="border-2 border-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="citaHora" className="mb-2 block text-gray-900">
                      Hora de Cita
                    </Label>
                    <Input
                      id="citaHora"
                      type="time"
                      value={citaHora}
                      onChange={(e) => setCitaHora(e.target.value)}
                      className="border-2 border-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notas" className="mb-2 block text-gray-900">
                    Notas y Observaciones
                  </Label>
                  <Textarea
                    id="notas"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    className="min-h-[200px] border-2 border-gray-800"
                    placeholder="Escribe notas sobre el cliente, seguimientos, acuerdos, etc."
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-800 bg-gray-50">
              <h2 className="text-gray-900 mb-4">Acciones Rápidas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="h-auto py-4 border-2 border-gray-700 bg-white text-gray-900 hover:bg-gray-700 hover:text-white"
                  onClick={() => {
                    setStatus('interesado');
                    toast.success('Estado cambiado a Interesado');
                  }}
                >
                  Marcar como Interesado
                </Button>
                <Button
                  className="h-auto py-4 border-2 border-gray-600 bg-white text-gray-900 hover:bg-gray-600 hover:text-white"
                  onClick={() => {
                    setStatus('no-interesado');
                    toast.success('Estado cambiado a No Interesado');
                  }}
                >
                  Marcar como No Interesado
                </Button>
                <Button
                  className="h-auto py-4 border-2 border-gray-500 bg-white text-gray-900 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    setStatus('no-contesta');
                    toast.success('Cliente archivado en No Contesta');
                  }}
                >
                  Archivar - No Contesta
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-800 bg-gray-100">
              <h2 className="text-gray-900 mb-2">Guía de Estados</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Nuevo:</strong> Cliente recién agregado, pendiente de contacto inicial</p>
                <p><strong>Interesado:</strong> Cliente muestra interés en productos de libranza</p>
                <p><strong>No Interesado:</strong> Cliente no desea servicios en este momento</p>
                <p><strong>No Contesta:</strong> Cliente archivado por falta de respuesta después de múltiples intentos</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
