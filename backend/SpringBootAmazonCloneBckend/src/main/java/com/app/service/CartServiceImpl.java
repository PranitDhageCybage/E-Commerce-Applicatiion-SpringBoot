package com.app.service;

import com.app.dao.CartRepository;
import com.app.dao.UserRepository;
import com.app.pojo.Cart;
import com.app.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements ICartService {

    @Autowired
    CartRepository cartRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    public List<Cart> getAllCartItems(int user_id) {
        if (userRepo.existsById(user_id)) {
            User user = userRepo.findById(user_id).get();
            return cartRepo.findAllByUser(user);
        }
        return null;
    }

    @Override
    public Cart addCartItem(Cart item) {
        return cartRepo.save(item);
    }

    @Override
    public Cart updateCartItemQty(int cart_id, int item_qty) {
        if (cartRepo.existsById(cart_id)) {
            Cart oldCart = cartRepo.findById(cart_id).get();
            if (item_qty != oldCart.getCartQuantity()) oldCart.setCartQuantity(item_qty);
            return cartRepo.save(oldCart);
        }
        return null;
    }

    @Override
    public String deleteCartItem(int cart_id) {
        if (cartRepo.existsById(cart_id)) {
            cartRepo.deleteById(cart_id);
            return "Item deleted successfully";
        }
        return "Item not found";
    }

    @Override
    public String deleteAllCartItemByUser(int user_id) {
        if (userRepo.existsById(user_id)) {
            User user = userRepo.findById(user_id).get();
            cartRepo.deleteAllByUser(user);
            return "Deleted All items from cart";
        }
        return "Item not found";
    }
}