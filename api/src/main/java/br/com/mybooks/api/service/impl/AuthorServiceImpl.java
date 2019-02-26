package br.com.mybooks.api.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.mybooks.api.entity.Author;
import br.com.mybooks.api.repository.AuthorRepository;
import br.com.mybooks.api.service.AuthorService;

/**
 * @author Brito
 *
 */
@Service
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorRepository repository;

	public void setRepository(AuthorRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<Author> list() {
		List<Author> list = repository.findAll();
		return list;
	}

	@Override
	public Author get(Long id) {
		Optional<Author> author = repository.findById(id);
		return author.get();
	}

	@Override
	public void save(Author author) {
		repository.save(author);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
	}

	@Override
	public void update(Author author) {
		repository.save(author);
	}
}
