package com.app.utils;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;

public class EncryptPassword {
    public static String getSHA256Hash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes("UTF-8"));
            return bytesToHex(hash); // make it printable
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * Use javax.xml.bind.DatatypeConverter class in JDK to convert byte array
     * to a hexadecimal string. Note that this generates hexadecimal in upper case.
     *
     * @param hash
     * @return
     */
    private static String bytesToHex(byte[] hash) {
        return DatatypeConverter.printHexBinary(hash);
    }
}
