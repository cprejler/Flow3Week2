/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import com.google.gson.annotations.SerializedName;


/**
 *
 * @author casper
 */
public class DadDTO {
    
    private String id;
    private String joke;
    private String reference;
    
   

    public DadDTO(String id, String joke) {
        this.id = id;
        this.joke = joke;
        reference = "https://icanhazdadjoke.com";
    }
   
    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJoke() {
        return joke;
    }

    public void setJoke(String joke) {
        this.joke = joke;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }
    
}
