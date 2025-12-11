import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useForm from '@/hooks/useForm';
import { es } from 'date-fns/locale/es';
import { Save } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import useUiStore from '@/hooks/useUiStore';
import 'react-datepicker/dist/react-datepicker.css';
import type CalendarEvent from './calendar-event';
// Add this before the EventModal component
export type EventModalRef = {
  open: () => void;
  close: () => void;
};

type EventModalProps = {
  event?: CalendarEvent | null;
  ref?: React.Ref<EventModalRef>;
};

registerLocale('es', es);

const EventModal = ({ event, ref }: EventModalProps) => {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useUiStore();

  const { formValues, onChange, onSubmit } = useForm({
    title: event?.title || '',
    notes: event?.notes || '',
    start: event?.start || new Date(),
    end: event?.end || new Date(),
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }

    //TODO: reset form values when closing the modal
  };

  const handleSubmit = (event: typeof formValues) => {
    const areDatesValid = event.start < event.end;

    if (!areDatesValid) {
      toast.error('Evento no válido', {
        description: 'La fecha de fin debe ser mayor a la fecha de inicio.',
        position: 'bottom-right',
      });

      return;
    }

    handleOpenChange(false);
  };

  if (!event) return null;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Nuevo evento</DialogTitle>
            <DialogDescription>Event details and information</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit(handleSubmit)}>
            <div className="flex flex-col gap-1 mb-2">
              <label>Fecha y hora inicio</label>
              <DatePicker
                selected={formValues.start}
                onChange={(e) => onChange('start', e)()}
                className="form-control"
                tabIndex={-1}
                showTimeSelect
                dateFormat="Pp"
                locale="es"
                required
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>Fecha y hora fin</label>
              <DatePicker
                minDate={formValues.start}
                selected={formValues.end}
                onChange={(e) => onChange('end', e)()}
                className="form-control"
                tabIndex={-1}
                showTimeSelect
                dateFormat="Pp"
                locale="es"
                required
              />
            </div>

            <hr />
            <div>
              <label>Titulo y notas</label>
              <Input
                type="text"
                className="form-control"
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
                onChange={onChange('title')}
                value={formValues.title as string}
                required
              />

              <small id="emailHelp">Una descripción corta</small>
            </div>

            <div>
              <textarea
                className="form-control"
                placeholder="Notas"
                rows={5}
                name="notes"
                onChange={onChange('notes')}
                value={formValues.notes}
              />
              <small id="emailHelp" className="font-rubik text-muted">
                Información adicional
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary btn-block"
              tabIndex={-1}
            >
              <Save />
              <span> Guardar</span>
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="top-right" />
    </>
  );
};

export default EventModal;
