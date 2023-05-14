export default class AuthController {
  constructor(props) {
    this.field = props?.field ?? undefined;
  }

  async signIn() {
    try {
      if (!this.field) return [new Error("this.field mush be defined"), null];

      const user = {
        id: 1,
        username: "johnDoe",
        email: "john@doe.com",
        avatar: null,
      };
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }
}
