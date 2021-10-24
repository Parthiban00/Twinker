import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private webService:WebService) { }

  GetMainCategory(){


    return this.webService.get('maincategories');
  }
  GetAddSlide(){


    return this.webService.get('addslides');
  }
  GetBuddySlide(){


    return this.webService.get('buddyslides');
  }
  GetBookingSlide(){


    return this.webService.get('bookingslides');
  }

}
