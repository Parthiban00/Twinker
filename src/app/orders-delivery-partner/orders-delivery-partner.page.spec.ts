import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersDeliveryPartnerPage } from './orders-delivery-partner.page';

describe('OrdersDeliveryPartnerPage', () => {
  let component: OrdersDeliveryPartnerPage;
  let fixture: ComponentFixture<OrdersDeliveryPartnerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDeliveryPartnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersDeliveryPartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
