interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2f241c]/45 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="pet-card rounded-lg shadow-2xl max-w-md w-full flex flex-col max-h-[90vh]">
        <div className="sticky top-0 bg-[#fffdf8] border-b border-[#ead9c6] px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
          <h3 className="text-lg font-bold text-[#3d2b1f]">{title}</h3>
          <button onClick={onClose} className="text-[#8f7b6b] hover:text-[#4b3525] text-2xl transition">
            ✕
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
