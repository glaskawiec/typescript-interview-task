import { IItem } from '../services/getUserItems';
import { THIRTY_DAYS_TIMESTAMP } from '../constants';

const itemIsOld = (item: IItem) => {
  const { createdAt } = item;

  const itemCreatedTimestamp = new Date(createdAt).getTime();
  const nowMinus30DaysTimestamp = new Date().getTime() - THIRTY_DAYS_TIMESTAMP;

  return itemCreatedTimestamp < nowMinus30DaysTimestamp;
};

export default itemIsOld;
