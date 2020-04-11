/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author casper
 */
import com.google.gson.annotations.SerializedName;


public class ChuckDTO {
    private String id;
    private String value;
    private String url;

    public ChuckDTO(String id, String value, String url) {
        this.id = id;
        this.value = value;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    
    
    

    

    

   
    
    
    
}
