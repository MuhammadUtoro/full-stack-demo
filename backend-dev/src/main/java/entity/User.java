package entity;

import dto.RegistrationDTO;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity
public class User extends PanacheMongoEntity{

    public User() {}

    private String lastName;
    private String firstName;
    private String password;
    private String userEmail;

    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public enum Role {
        ADMIN,
        TRAINER,
        PARENT
    }

    private Role role;
    

    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public User(RegistrationDTO registrationDTO, String hashedPassword) {
        this.firstName = registrationDTO.firstName();
        this.lastName = registrationDTO.lastName();
        this.userEmail = registrationDTO.userEmail();
        this.password = hashedPassword;
    }

}
