// Admin authentication utilities
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "royalhood123"
};

// Simple session storage simulation
class AdminSession {
  private static isLoggedIn = false;
  
  static login(username: string, password: string): boolean {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }
  
  static logout(): void {
    this.isLoggedIn = false;
  }
  
  static isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

export { AdminSession };