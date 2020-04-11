package rest;

import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import webscraper.TagCounter;
import webscraper.Tester;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import javax.annotation.security.RolesAllowed;
import webscraper.TagDTO;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("scrape")
public class WebScraperResource {

    @Context
    private UriInfo context;

    @GET
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public String getTags() throws InterruptedException {
        return makeResponse();
    }

    private String makeResponse() throws InterruptedException {
        //return "{\"todo\":\"Make me return the calculated values from the external requests\"}"; 
        List<TagCounter> dataFeched = Tester.runParrallel();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        List<TagDTO> results = new ArrayList();
        for(TagCounter tc: dataFeched){
            results.add(new TagDTO(tc));
        }
        return gson.toJson(results);
    }
    
    
    

}
