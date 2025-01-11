package auth;
import io.smallrye.jwt.build.Jwt;
import java.util.Collections;
import java.util.HashSet;

import entity.User;

public class TokenGenerator {

    public static String generateToken(String issuer, String upn, User.Role role) {
        return Jwt.issuer(issuer).upn(upn).groups(new HashSet<>(Collections.singletonList(role.name())))
        .sign();
    }
}
