"use client";

import { useAddressManager } from "../hooks/useAddressManager";
import { Modal } from "../Modal";
import AddressAddForm from "./AddressAddForm";
import AddressUpdateForm from "./AddressUpdateForm";

export default function AddressList() {
  const {
    addresses,
    defaultAddress,
    selectedAddressId,
    setSelectedAddressId,
    activeModal,
    editingAddress,
    openList,
    openAdd,
    openUpdate,
    closeAll,
    handleSetDefault,
    handleAdd,
    handleUpdate,
  } = useAddressManager();

  return (
    <div className="space-y-6">
      {defaultAddress && (
        <div className="pet-card rounded-lg overflow-hidden">
          <div className="bg-[#f5eadc] px-6 py-4 border-b border-[#ead9c6]">
            <div className="flex items-center gap-2">
              <span className="text-[#9f5f36] text-xl">📍</span>
              <h3 className="text-[#3d2b1f] font-semibold">Địa Chỉ Nhận Hàng</h3>
            </div>
          </div>

          <div className="p-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-[#3d2b1f] font-bold text-lg">{defaultAddress.label}</h4>
                <span className="bg-[#dff3e8] text-[#23684d] text-xs font-bold px-2 py-1 rounded">
                  Mặc định
                </span>
              </div>
              <p className="text-[#6d5a49] text-sm mb-2">{defaultAddress.phone}</p>
              <p className="text-[#4b3525] text-sm">{defaultAddress.fullAddress}</p>
            </div>
            <button
              onClick={openList}
              className="bg-[#9f5f36] hover:bg-[#7d4525] text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Thay Đổi
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={activeModal === "LIST"} onClose={closeAll} title="Địa Chỉ Của Tôi">
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectedAddressId(address.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition flex items-start gap-3 ${
                selectedAddressId === address.id
                  ? "border-[#9f5f36] bg-[#fff8ed]"
                  : "border-[#ead9c6] hover:border-[#d8c1ab] bg-[#fffdf8]"
              }`}
            >
              <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAddressId === address.id ? "border-[#9f5f36] bg-[#9f5f36]" : "border-[#d8c1ab]"
              }`}>
                {selectedAddressId === address.id && <span className="text-white text-xs">✓</span>}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[#3d2b1f] font-bold">{address.label}</h4>
                    <p className="text-[#6d5a49] text-sm">{address.phone}</p>
                    <p className="text-[#6d5a49] text-sm mt-1">{address.fullAddress}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openUpdate(address.id);
                    }}
                    className="text-[#9f5f36] hover:text-[#6f4a2f] text-sm font-semibold"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={openAdd}
            className="w-full bg-[#fffdf8] border-2 border-dashed border-[#d8c1ab] text-[#9f5f36] hover:bg-[#f5eadc] font-bold py-3 rounded-lg transition"
          >
            + Thêm Địa Chỉ Mới
          </button>
          <div className="flex gap-3 border-t border-[#ead9c6] pt-3">
            <button onClick={closeAll} className="flex-1 bg-[#ead9c6] hover:bg-[#d8c1ab] text-[#3d2b1f] font-bold py-3 rounded-lg">
              Hủy
            </button>
            <button
              onClick={() => handleSetDefault(selectedAddressId)}
              className="flex-1 bg-[#9f5f36] hover:bg-[#7d4525] text-white font-bold py-3 rounded-lg"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === "ADD"} onClose={openList} title="Thêm Địa Chỉ Mới">
        <AddressAddForm onSubmit={handleAdd} onCancel={openList} />
      </Modal>

      <Modal isOpen={activeModal === "UPDATE"} onClose={openList} title="Cập nhật địa chỉ">
        {editingAddress && (
          <AddressUpdateForm
            initialData={editingAddress}
            onSubmit={(data) => handleUpdate(editingAddress.id, data)}
            onCancel={openList}
          />
        )}
      </Modal>
    </div>
  );
}
