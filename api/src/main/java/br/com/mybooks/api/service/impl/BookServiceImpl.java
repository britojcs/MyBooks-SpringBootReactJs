package br.com.mybooks.api.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.mybooks.api.entity.Book;
import br.com.mybooks.api.repository.BookRepository;
import br.com.mybooks.api.service.BookService;

/**
 * @author Brito
 *
 */
@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository repository;

	public void setRepository(BookRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<Book> list() {
		List<Book> list = repository.findAll();
		return list;
	}

	@Override
	public Book get(Long id) {
		Optional<Book> author = repository.findById(id);
		return author.get();
	}

	@Override
	public void save(Book author) {
		repository.save(author);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
	}

	@Override
	public void update(Book author) {
		repository.save(author);
	}
}
