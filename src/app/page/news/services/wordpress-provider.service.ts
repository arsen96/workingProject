import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordpressProviderService {

  BASE_URL_WORDPRESS_API = 'https://mathia.education/wp-json/wp/v2'

  constructor(private http:HttpClient) {

   }

   getALlCategories(){
    return this.http.get(`${this.BASE_URL_WORDPRESS_API}/categories`)
   }

   getAllPostsInCategory(categoryId:number){
    return this.http.get(`${this.BASE_URL_WORDPRESS_API}/posts?categories=${categoryId}`)
   }


}
