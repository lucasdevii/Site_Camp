import { createPortal } from "react-dom";

export default function ModalLogout() {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Tem certeza que deseja sair?</h2>
        <p className="mb-4">Essa ação não poderá ser desfeita.</p>
        <div className="flex justify-end gap-3">
          <button className="px-3 py-1 bg-gray-300 rounded">Cancelar</button>
          <button className="px-3 py-1 bg-red-500 text-white rounded">
            Sair
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
