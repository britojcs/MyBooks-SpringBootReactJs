package br.com.mybooks.api.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
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

import br.com.mybooks.api.entity.Book;
import br.com.mybooks.api.service.BookService;

/**
 * @author Brito
 *
 */
@RestController
@RequestMapping("/book")
public class BookController {

	@Autowired
	private BookService service;

	public void setService(BookService service) {
		this.service = service;
	}

	@GetMapping
	public List<Book> getList() {
		List<Book> list = service.list();
		return list;
	}

	@GetMapping("/{id}")
	public Book get(@PathVariable(name = "id") Long id) {
		return service.get(id);
	}

	@PostMapping
	public void save(@RequestBody Book book) {
		service.save(book);
		System.out.println("Saved Successfully");
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable(name = "id") Long id) {
		service.delete(id);
		System.out.println("Deleted Successfully");
	}

	@PutMapping("/{id}")
	public void update(@RequestBody Book book, @PathVariable(name = "id") Long id) {
		Book b = service.get(id);
		if (b != null)
			service.update(book);
	}

	@GetMapping("/bookcase/{weight}")
	public List<Book> getBookcase(@PathVariable(name = "weight") Double weight) {
		List<Book> list = service.list();
		List<Book> list2 = new ArrayList<>();

		try {
			// ordenando por peso
			list.sort((Book b1, Book b2) -> b1.getWeight().compareTo(b2.getWeight()));

			BigDecimal w = new BigDecimal(weight);
			BigDecimal sum = new BigDecimal(0);
			// add na lista até o limite
			for (Book b : list) {
				sum = sum.add(b.getWeight());
				if (sum.compareTo(w) == 1)
					return list2;
				else
					list2.add(b);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return list2;
	}

}
