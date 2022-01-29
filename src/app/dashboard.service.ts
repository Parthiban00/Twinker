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
  GetAddSlide(data){


    return this.webService.get(`addslides/${data.locality}`);
  }
  GetBuddySlide(data){


    return this.webService.get(`buddyslides/${data.locality}`);
  }
  GetBookingSlide(data){


    return this.webService.get(`bookingslides/${data.locality}`);
  }

  GetBuddyBanner(data){


    return this.webService.get(`buddybanners/${data.locality}`);
  }

}
