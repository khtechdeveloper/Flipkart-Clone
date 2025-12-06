const Admin = require('./models/Admin');
async function createAdmin() {
    try {
        let adminExists = await Admin.findOne({ email: "kd@gmail.com" });
        if (adminExists) {
            console.log("Admin updated.....");
        } else {
            let admin = new Admin();
            admin.firstName = "kd";
            admin.lastName = "Ansari";
            admin.email = "kd@gmail.com",
                admin.password = "12345";
            await admin.save();
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = createAdmin;