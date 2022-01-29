

export default class Orders{


    _id:string="";
    OrderId:string ="";
    UserId: string="";
    UserName: string="";
    RestaurantId: string="";
    RestaurantName: string="";
    ItemTotal: number=0;
    DeliveryPartnerFee: number=0;
    TaxesAndCharges: number=0;
    TotalAmount: number=0;
    ActiveYn: boolean=true;
    DeleteYn: boolean=false;
    Status: string="";
    CreatedDate: string="";
    CreatedBy: String="";
    ItemCount: number=0;
    MobileNo: string="";
    Address:string="";
    ItemDetails:any;
    DeliveryPartnerDetails:{
      FirstName:String;
      MobileNo:String;
      UserType:String;
      UserId:String;
      ImageUrl:String;

    };
    DeliveryPartnerStatus:String;
    ActualAmount:number;
    Discount:number;
DiscountDescription:string;
DiscountCode:string;
CreatedTime;
Latitude:number;
Longitude:number;
DeliveryTime:number;
Locality:string;
Suggestions:String;
PaymentDetails:{
  PaymentType:string;
  Status:string;
  RazorpayPaymentId:string;
  RazorPayOrderId:string;
  RazorPaySignature:string;
}
 }

