type DeleteAlertProps = {
  content: string;
  onDelete: () => void;
};

function DeleteAlert({ onDelete, content }: DeleteAlertProps) {
  return <div>DeleteAlert</div>;
}

export default DeleteAlert;
