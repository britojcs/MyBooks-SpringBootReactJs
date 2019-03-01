package br.com.mybooks.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.mybooks.api.entity.Author;
import br.com.mybooks.api.service.AuthorService;

/**
 * @author Brito
 *
 */
@RestController
@RequestMapping("/author")
public class AuthorController {

	@Autowired
	private AuthorService service;

	public void setService(AuthorService service) {
		this.service = service;
	}

	@GetMapping
	public List<Author> getList() {
		List<Author> list = service.list();
		return list;
	}

	@GetMapping("/{id}")
	public Author get(@PathVariable(name = "id") Long id) {
		return service.get(id);
	}

	@PostMapping
	public void save(@RequestBody Author author) {
		service.save(author);
		System.out.println("Saved Successfully");
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable(name = "id") Long id) {
		service.delete(id);
		System.out.println("Deleted Successfully");
	}

	@PutMapping("/{id}")
	public void update(@RequestBody Author author, @PathVariable(name = "id") Long id) {
		Author a = service.get(id);
		if (a != null)
			service.update(author);
	}

}
