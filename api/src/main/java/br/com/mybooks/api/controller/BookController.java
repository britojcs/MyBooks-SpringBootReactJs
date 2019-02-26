package br.com.mybooks.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.mybooks.api.entity.Book;
import br.com.mybooks.api.service.BookService;

/**
 * @author Brito
 *
 */
@RestController
public class BookController {

	@Autowired
	private BookService service;

	public void setService(BookService service) {
		this.service = service;
	}

	@GetMapping("/book")
	public List<Book> getList() {
		List<Book> list = service.list();
		return list;
	}

	@GetMapping("/book/{id}")
	public Book get(@PathVariable(name = "id") Long id) {
		return service.get(id);
	}

	@PostMapping("/book")
	public void save(Book book) {
		service.save(book);
		System.out.println("Saved Successfully");
	}

	@DeleteMapping("/book/{id}")
	public void delete(@PathVariable(name = "id") Long id) {
		service.delete(id);
		System.out.println("Deleted Successfully");
	}

	@PutMapping("/book/{id}")
	public void update(@RequestBody Book book, @PathVariable(name = "id") Long id) {
		Book b = service.get(id);
		if (b != null)
			service.update(book);
	}

}
