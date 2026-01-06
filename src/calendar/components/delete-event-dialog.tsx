import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useFirebase } from '@/hooks/useFirebase';
import useUiStore from '@/hooks/useUiStore';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { CALENDAR_EVENTS_COLLECTION } from '../constants/calendar';
import useCalendarStore from '../hooks/useCalendarStore';

const DeleteEventDialog = () => {
  const { startDeleteEvent, activeEvent } = useCalendarStore();
  const { isAlertOpen, handleCloseAlert } = useUiStore();
  const { db } = useFirebase();

  const handleDeleteEvent = async () => {
    if (!activeEvent) return;

    try {
      const eventId = activeEvent._id;
      await deleteDoc(doc(db, CALENDAR_EVENTS_COLLECTION, eventId));

      startDeleteEvent();
      toast.success('Evento eliminado', {
        description: 'El evento se ha eliminado correctamente.',
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Error al eliminar', {
        description: 'No se pudo eliminar el evento. Intenta de nuevo.',
        position: 'bottom-right',
      });
      console.error('Error deleting event:', error);
    } finally {
      handleCloseAlert();
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={handleCloseAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar el evento "{activeEvent?.title}
            "? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseAlert}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteEvent}
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventDialog;
