module.exports = () => {
  return async (ctx, next) => {
    await next();

    // Check if the request is a successful user registration
    if (
      ctx.request.url === "/api/auth/local/register" &&
      ctx.response.status === 400 &&
      ctx.response.body?.user?.id
    ) {
      console.log("==================================");
      console.log(JSON.stringify(ctx.response));
      console.log("==================================");
      try {
        const userId = ctx.response.body.user.id;

        // Fetch the user including the confirmationToken
        const user = await strapi.db
          .query("plugin::users-permissions.user")
          .findOne({
            where: { id: userId },
            select: ["id", "email", "confirmationToken"], // Explicitly fetch confirmationToken
          });

        if (user) {
          console.log("User Confirmation Token:", user.confirmationToken);
        } else {
          console.log("User not found after registration.");
        }
      } catch (error) {
        console.error("Error fetching user confirmation token:", error);
      }
    }
  };
};
