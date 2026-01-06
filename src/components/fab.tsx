import { Button } from './ui/button';

type Props = React.ComponentProps<typeof Button> & {
  icon: React.ComponentType;
};

const Fab = (props: Props) => {
  const { icon: Icon } = props;

  return (
    <Button {...props} variant="outline" id="fab-add-event">
      <Icon />
    </Button>
  );
};

Fab.propTypes = {};

export default Fab;
