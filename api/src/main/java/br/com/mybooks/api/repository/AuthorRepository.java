package br.com.mybooks.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mybooks.api.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

}
