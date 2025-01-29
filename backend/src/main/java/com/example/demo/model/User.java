package com.example.demo.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)

    private Long cin;
    private String fname;

    private String lname;

    private String password;

    private Integer phone;

    private  Integer age;

    private String email;

}
