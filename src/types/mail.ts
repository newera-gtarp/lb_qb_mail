export interface Email {
  id: number;
  citizenid: string;
  sender: string;
  subject: string;
  message: string;
  read_at?: Date;
  created_at: Date;
  deleted_at?: Date;
  button?: {
    buttonEvent: string;
    buttonData: any;
    enabled: boolean;
  };
}

export interface Mail {
  sender: string;
  subject: string;
  message: string;
  mailid: number;
  read: number;
  date: number;
  button?: buttonContentInt;
}

export interface buttonContentInt {
  buttonEvent: string;
  enabled: boolean;
  buttonData: {
    dealer: string;
    itemData: {
      minrep: number;
      item: string;
    };
    amount: number;
    locationLabel: string;
    coords: {
      x: number;
      y: number;
      z: number;
    };
  };
}
