import { PropertyEnvironment } from "./property-environment.enum";
import { PropertyTypes } from "./property-types.enum";

export interface IProperty {
  id?: number;
  property: string;
  value: string;
  type: PropertyTypes | null;
  environment: PropertyEnvironment | null;
  status?: string;
  createdAt?: Date;
  updateAt?: Date;
}
