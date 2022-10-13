import { v4 as uuidV4 } from 'uuid';

export class Cars {
  id?: string;
  name: string;
  daily_rate: number;
  available?: boolean;
  license_plate: string;
  fine_amount: string;
  brand: string;
  category_id: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.available = true;
  }
}
