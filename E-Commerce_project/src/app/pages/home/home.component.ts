import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../../shared/card/card/card.component';
import { UserDataService } from '../../core/services/user-data.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { BestPPipe } from '../../core/pipes/best-p.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, BestPPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  images: any[] | undefined;

  products: IProducts[] = [];
  bestProducts: IProducts[] = [];

  constructor(private _userDataService: UserDataService) {}

  ngOnInit(): void {
    this.images = [
      {
        itemImageSrc: '../../assets/product-1.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: '../../assets/product-2.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: '../../assets/product-3.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
    ];
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._userDataService.allProducts().subscribe((next) => {
      console.log(next);
      this.bestProducts = next.filter((p:IProducts) => p.rating.rate >= 3.5).slice(0, 4);
      this.products = next.slice(4, 20);
    });
  }
}
