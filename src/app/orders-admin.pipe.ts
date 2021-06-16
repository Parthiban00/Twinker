import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersAdmin'
})
export class OrdersAdminPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
