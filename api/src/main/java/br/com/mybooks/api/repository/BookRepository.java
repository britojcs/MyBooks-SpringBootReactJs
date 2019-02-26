package br.com.mybooks.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mybooks.api.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
