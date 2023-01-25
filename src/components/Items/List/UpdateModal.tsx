import React, { FC, useEffect, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import updateItem from '../../../services/updateItem';
import Modal from 'react-modal';
import { useItemsContext } from '../../../contexts/ItemsContext';

interface IUpdateModal {
  item: IItem;
}

const UpdateModal: FC<IUpdateModal> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');

  const { items, setItems } = useItemsContext();

  const closeModal = () => setShowModal(false);

  const onUpdateButtonClick = () => {
    setNewPass('');
    setShowModal(true);
  };

  const onChangeClick = async () => {
    const newItem = {
      ...item,
      password: newPass,
      createdAt: new Date().toDateString(),
    };
    await updateItem(newItem);
    setItems([...items.filter((i) => i.id !== item.id), newItem]);
    closeModal();
  };

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  return (
    <>
      <button className='update' onClick={onUpdateButtonClick}>
        Update Password
      </button>
      <Modal
        ariaHideApp={false}
        testId='modal'
        className='modal'
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
      >
        <h1>Update Password</h1>
        <input
          placeholder='new password'
          className='input'
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <div className='pt-12px text-center'>
          <button className='button' onClick={onChangeClick}>
            Change
          </button>
          <button className='button ml-12px' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateModal;
