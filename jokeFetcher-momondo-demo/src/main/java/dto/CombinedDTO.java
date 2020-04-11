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
public class CombinedDTO {
    
    private String dadJoke;
    private String dadJokeRef;
    private String chuckJoke;
    private String chuckJokeRef;
    
    public CombinedDTO(DadDTO dadDTO, ChuckDTO chuckDTO){
        this.dadJoke = dadDTO.getJoke();
        this.dadJokeRef = "https://icanhazdadjoke.com";
        this.chuckJoke = chuckDTO.getValue();
        this.chuckJokeRef = chuckDTO.getUrl();
    }

    
    
    
    
    
    
}
