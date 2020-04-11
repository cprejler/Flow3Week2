package rest;

import com.google.gson.Gson;
import dto.ChuckDTO;
import dto.CombinedDTO;
import dto.DadDTO;
import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("jokes")
public class JokeResource {

    @Context
    private UriInfo context;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJokes() throws IOException, InterruptedException {
        HashMap<String, String> jokes = new HashMap<>();

        Gson gson = new Gson();

        ExecutorService workingJack = Executors.newFixedThreadPool(2);

        Runnable task = () -> {

            try {
                String chuck = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
                String dad = HttpUtils.fetchData("https://icanhazdadjoke.com");
                jokes.put("dad", dad);
                jokes.put("chuck", chuck);

            } catch (Exception e) {
                e.printStackTrace();
            }
        };
        workingJack.submit(task);

        workingJack.shutdown();
        workingJack.awaitTermination(15, TimeUnit.SECONDS);

        ChuckDTO chuckDTO = gson.fromJson(jokes.get("chuck"), ChuckDTO.class);
        DadDTO dadDTO = gson.fromJson(jokes.get("dad"), DadDTO.class);

        return gson.toJson(new CombinedDTO(dadDTO, chuckDTO));
    }

}
