import { HttpClient } from "@angular/common/http";
import { tokenize } from "@angular/compiler/src/ml_parser/lexer";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from "../config/api.config";
import { Credenciais } from "../models/credenciais";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  jwtService: JwtHelperService = new JwtHelperService();

  /* metodo que faz autenticação no backend*/
  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}login`, creds, {
      observe: "response",
      responseType: "text",
    });
  }

  /* verifica se o login deu sucesso */
  successfulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  /* Verifica se o token esta expirado */
  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }
}
