package com.habersitesi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.habersitesi.model.Bildirim;

import java.util.List;

public interface BildirimRepository extends JpaRepository<Bildirim, Long> {
    List<Bildirim> findByHedefKullaniciEmailAndOkunduFalse(String email);
    List<Bildirim> findByHedefKullaniciEmailOrderByTarihDesc(String email);

}
