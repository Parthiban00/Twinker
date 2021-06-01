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
    
 }

