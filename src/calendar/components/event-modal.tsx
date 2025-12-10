import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useForm from '@/hooks/useForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { Save } from 'lucide-react';
import { useImperativeHandle, useState } from 'react';
import { type Event } from 'react-big-calendar';
import DatePicker, { registerLocale } from 'react-datepicker';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import 'react-datepicker/dist/react-datepicker.css';
// Add this before the EventModal component
export type EventModalRef = {
  open: () => void;
  close: () => void;
};

type EventModalProps = {
  event: Event | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  ref?: React.Ref<EventModalRef>;
};

registerLocale('es', es);

const formatDate = (date: Date | undefined) => {
  if (!date) return '';

  return format(date, 'PPP');
};

const formatTime = (date: Date | undefined) => {
  if (!date) return '';

  return format(date, 'p');
};

const isSameDay = (start: Date | undefined, end: Date | undefined) => {
  if (!start || !end) return false;

  return format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd');
};

const EventModal = ({ event, open, onOpenChange, ref }: EventModalProps) => {
  const [openState, setOpenState] = useState(open);
  const { formValues, onChange, onSubmit } = useForm({
    title: event?.title || '',
    notes: '',
    start: event?.start || new Date(),
    end: event?.end || new Date(),
  });

  const isForwardedRef = !!ref;
  const finalOpen = isForwardedRef ? openState : open;

  const handleOpenChange = (isOpen: boolean) => {
    if (isForwardedRef) {
      setOpenState(isOpen);
    } else if (onOpenChange) {
      onOpenChange(isOpen);
    }

    //TODO: reset form values when closing the modal
  };

  useImperativeHandle(ref, () => ({
    open: () => handleOpenChange(true),
    close: () => handleOpenChange(false),
  }));

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
      <Dialog open={finalOpen} onOpenChange={handleOpenChange}>
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
      <Toaster position="top-right" toastOptions={{}} />
    </>
  );
};

export default EventModal;
