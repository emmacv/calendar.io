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

import useUiStore from '@/hooks/useUiStore';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { MODAL_MODE_TYPES } from '../constants/modal-mode';
import useCalendarStore from '../hooks/useCalendarStore';
import { useUpsertEvent } from '../hooks/useUpsertEvent';
import type { CalendarEvent } from '../models/CalendarEvent';

// Add this before the EventModal component
export type EventModalRef = {
  open: () => void;
  close: () => void;
};

registerLocale('es', es);

const EventModal = () => {
  const { isModalOpen, mode, handleOpenModal, handleCloseModal } = useUiStore();
  const { handleSelectEvent } = useCalendarStore();
  // activeEvent is asynchronously updated, so a call for useEffect is needed
  const { activeEvent } = useCalendarStore();
  const { addEvent, updateEvent } = useUpsertEvent();

  const { formValues, onChange, onSubmit, setInitialValues } =
    useForm<CalendarEvent>({
      title: '',
      notes: '',
      start: new Date(),
      end: new Date(),
      _id: '',
      userId: '',
    });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      handleOpenModal(mode);
    } else {
      handleCloseModal();
      handleSelectEvent(null);
    }
    //TODO: reset form values when closing the modal
  };

  const updateOrAddEvent = async (
    mode: MODAL_MODE_TYPES,
    event: CalendarEvent
  ) => {
    type ToastArgs = Parameters<typeof toast.success>;
    let toastArgs: ToastArgs | undefined;

    switch (mode) {
      case MODAL_MODE_TYPES.ADD:
        await addEvent(event);
        toastArgs = [
          'Evento guardado',
          {
            description: 'El evento se ha guardado correctamente.',
            position: 'bottom-right',
          },
        ];
        break;
      case MODAL_MODE_TYPES.EDIT:
        await updateEvent({ ...activeEvent, ...event });
        toastArgs = [
          'Evento actualizado',
          {
            description: 'El evento se ha actualizado correctamente.',
            position: 'bottom-right',
          },
        ];
    }

    if (toastArgs) {
      toast.success(...toastArgs);
    }
  };

  const handleSubmit = async (event: typeof formValues) => {
    if (!event) return;
    const areDatesValid = event.start < event.end;

    if (!areDatesValid) {
      toast.error('Evento no válido', {
        description: 'La fecha de fin debe ser mayor a la fecha de inicio.',
        position: 'bottom-right',
      });

      return;
    }

    await updateOrAddEvent(mode, event);

    handleOpenChange(false);
  };

  useEffect(() => {
    if (mode === MODAL_MODE_TYPES.ADD) return;

    setInitialValues({
      title: activeEvent?.title ?? '',
      notes: activeEvent?.notes ?? '',
      start: activeEvent?.start ?? new Date(),
      end: activeEvent?.end ?? new Date(),
      _id: activeEvent?._id ?? '',
      userId: activeEvent?.userId ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeEvent?.title,
    activeEvent?.notes,
    activeEvent?.start,
    activeEvent?.end,
    mode,
  ]);

  // TODO: implement form validation and show errors
  // TODO: Implement color picker for event background color
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
                selected={new Date(formValues?.start ?? new Date().getTime())}
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
                minDate={new Date(formValues?.start ?? new Date().getTime())}
                selected={new Date(formValues?.end ?? new Date().getTime())}
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
                value={formValues?.title as string}
                required
              />

              <small id="emailHelp">Una descripción corta</small>
            </div>
            <button
              onClick={() =>
                toast('Event has been created', {
                  description: 'Sunday, December 03, 2023 at 9:00 AM',
                  action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo'),
                  },
                })
              }
            >
              click me
            </button>

            <div>
              <textarea
                className="form-control"
                placeholder="Notas"
                rows={5}
                name="notes"
                onChange={onChange('notes')}
                value={formValues?.notes}
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
    </>
  );
};

export default EventModal;
