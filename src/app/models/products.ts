export default class Product{
    _id:string ="";
     RestaurantId: string="";
     MenuId: string="";
     ProductName: string="";
     Description:string="";
     Price:number=0;
     Size:string="";
     AvailableTime: string="";
     AvailableStatus: boolean=true;
     AvailableDays: string="";
     ActiveYn: boolean=true;
     DeleteYn: boolean=false;
     ItemCount:number=0;
     Amount:number=0;
     Offer:number=0;
     OfferPrice:number=0;
     Commission:number;
     Sort:number;
     OfferDescription:string;
     ImageUrl:string;
     ActualAmount:number;
     Category:string;
     RestaurantName:string;
     Recommended:Boolean;
     Badge:Boolean;
     BadgeDescription:string;
     Type:string;
     Suggestion:Boolean
 }
