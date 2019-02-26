package br.com.mybooks.api.service;

import java.util.List;

/**
 * @author Brito
 *
 */
public abstract interface BaseService<E> {

	public List<E> list();

	public E get(Long id);

	public void save(E entity);

	public void delete(Long id);

	public void update(E entity);

}
