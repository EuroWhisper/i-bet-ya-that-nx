import { Button } from '../Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';

type Props = {
  open: boolean;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  isPrimaryLoading?: boolean;
  isSecondaryLoading?: boolean;
  onClose: () => void;
  primaryAction: () => void;
  secondaryAction?: () => void;
};

export const ConfirmationDialog = ({
  open,
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  isPrimaryLoading,
  isSecondaryLoading,
  onClose,
  primaryAction,
  secondaryAction,
}: Props) => {
  const isActionsDisabled = isPrimaryLoading || isSecondaryLoading;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            isLoading={isPrimaryLoading}
            disabled={isActionsDisabled}
            onClick={primaryAction}
            type="button"
            variant="default"
          >
            {primaryActionLabel}
          </Button>
          {secondaryAction && (
            <Button
              isLoading={isSecondaryLoading}
              disabled={isActionsDisabled}
              onClick={secondaryAction}
              type="button"
              variant="outline"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
